#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

process.stdout.on('error', (error) => {
  if (error.code === 'EPIPE') process.exit(0);
  throw error;
});

const API_BASE = 'https://cloud.leonardo.ai/api/rest';
const DEFAULT_MODEL = '7b592283-e8a7-4c5a-9ba6-d18c31f258b9'; // Lucid Origin
const MODEL_ALIASES = {
  'lucid-origin': DEFAULT_MODEL,
  'lucid-realism': '05ce0082-2d80-4a2d-8653-4d1c85e2418e',
};
const V2_MODELS = new Set(['seedream-4.5', 'gpt-image-2']);
const STYLE_UUIDS = {
  CINEMATIC: 'a5632c7c-ddbb-4e2f-ba34-8456ab3ac436',
  CREATIVE: '6fedbf1f-4a17-45ec-84fb-92fe524a29ef',
  DYNAMIC: '111dc692-d470-4eec-b791-3475abac4c46',
  FASHION: '594c4a08-a522-4e0e-b7ff-e4dac4b6b622',
  ILLUSTRATION: '645e4195-f63d-4715-a3f2-3fb1e6eb8c70',
  NONE: '556c1ee5-ec38-42e8-955a-1e82dad0ffa1',
  PORTRAIT: 'ab5a4220-7c42-41e5-a578-eddb9fed3d75',
  STOCK_PHOTO: '5bdc3f2a-1be6-4d1c-8e77-992a30824a2c',
  VIBRANT: 'dee282d3-891f-4f73-ba02-7f8131e5541b',
};
const SEEDREAM_STYLE_UUIDS = Object.fromEntries(
  ['CINEMATIC', 'CREATIVE', 'DYNAMIC', 'FASHION', 'PORTRAIT', 'STOCK_PHOTO', 'VIBRANT']
    .map((style) => [style, STYLE_UUIDS[style]])
);

function usage() {
  console.log(`Uso:
  node skills/criar-imagem-leonardo/scripts/generate-image.js --list-models
  node skills/criar-imagem-leonardo/scripts/generate-image.js --dry-run --category <categoria> --name <nome> --prompt "<texto>"
  node skills/criar-imagem-leonardo/scripts/generate-image.js --category <categoria> --name <nome> --prompt "<texto>" [opcoes]

Opcoes:
  --model <alias>          lucid-origin (default), lucid-realism, seedream-4.5 ou gpt-image-2
  --model-id <id>          ID Lucid obtido com --list-models
  --style <style>          Lucid: DYNAMIC, ILLUSTRATION, STOCK_PHOTO, CINEMATIC ou NONE
                           Seedream: DYNAMIC, CINEMATIC, CREATIVE, FASHION, PORTRAIT, STOCK_PHOTO ou VIBRANT
  --quality <nivel>        Para gpt-image-2: LOW, MEDIUM (default) ou HIGH
  --width <pixels>         1024 por default
  --height <pixels>        1024 por default
  --negative-prompt <txt>  Restricoes adicionais; apenas fluxo Lucid v1
  --prompt-enhance <ON|OFF> Para modelos v2; default OFF
  --seed <numero>          Seed para seedream-4.5
  --reference-id <ids>     IDs de ate 6 imagens, separados por virgula; modelos v2
  --reference-type <tipo>  GENERATED ou UPLOADED; default UPLOADED
  --reference-strength <n> LOW, MID ou HIGH; somente seedream-4.5
  --transparent            Reservado; o script recusa ate haver fluxo compativel implementado
  --timeout <segundos>     Tempo maximo de espera, default 180
  --dry-run                Valida e mostra o payload sem chamar a API

A chave e lida de LEONARDO_API_KEY no ambiente ou no .env da raiz.`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith('--')) {
      throw new Error(`Argumento inesperado: ${current}`);
    }
    const key = current.slice(2);
    if (['list-models', 'transparent', 'dry-run', 'help'].includes(key)) {
      args[key] = true;
      continue;
    }
    if (i + 1 >= argv.length || argv[i + 1].startsWith('--')) {
      throw new Error(`Valor ausente para --${key}`);
    }
    args[key] = argv[i + 1];
    i += 1;
  }
  return args;
}

function findProjectRoot() {
  const starts = [process.cwd(), path.resolve(__dirname, '../../..')];
  for (const start of starts) {
    let dir = path.resolve(start);
    while (true) {
      if (fs.existsSync(path.join(dir, '.env')) || fs.existsSync(path.join(dir, 'assets'))) {
        return dir;
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return process.cwd();
}

function readDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const env = {};
  for (const rawLine of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const equals = line.indexOf('=');
    if (equals < 1) continue;
    const key = line.slice(0, equals).trim();
    let value = line.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function apiKey(projectRoot) {
  const fileEnv = readDotEnv(path.join(projectRoot, '.env'));
  const key = process.env.LEONARDO_API_KEY || fileEnv.LEONARDO_API_KEY;
  if (!key) {
    throw new Error('LEONARDO_API_KEY nao encontrada no ambiente ou no .env da raiz.');
  }
  return key;
}

function slug(value, label) {
  if (!value) throw new Error(`${label} e obrigatorio.`);
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!normalized) throw new Error(`${label} nao contem caracteres validos.`);
  return normalized;
}

function legacyDimension(value, fallback, label) {
  const number = value ? Number.parseInt(value, 10) : fallback;
  if (!Number.isInteger(number) || number < 32 || number > 1536 || number % 8 !== 0) {
    throw new Error(`${label} deve ser multiplo de 8 entre 32 e 1536.`);
  }
  return number;
}

function seedreamDimension(value, fallback, label) {
  const number = value ? Number.parseInt(value, 10) : fallback;
  if (!Number.isInteger(number) || number < 256 || number > 1440 || number % 8 !== 0) {
    throw new Error(`${label} para seedream-4.5 deve ser multiplo de 8 entre 256 e 1440.`);
  }
  return number;
}

function gptDimensions(args) {
  const width = args.width ? Number.parseInt(args.width, 10) : 1024;
  const height = args.height ? Number.parseInt(args.height, 10) : 1024;
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width % 16 !== 0 ||
    height % 16 !== 0 ||
    Math.max(width, height) >= 3840 ||
    Math.max(width, height) / Math.min(width, height) > 3 ||
    width * height < 655360 ||
    width * height > 8294400
  ) {
    throw new Error('Dimensoes para gpt-image-2 devem ser multiplas de 16, ter lado maximo menor que 3840, proporcao ate 3:1 e entre 655360 e 8294400 pixels.');
  }
  return { width, height };
}

function v2CommonParameters(args, width, height) {
  const promptEnhance = String(args['prompt-enhance'] || 'OFF').toUpperCase();
  if (!['ON', 'OFF'].includes(promptEnhance)) {
    throw new Error('--prompt-enhance deve ser ON ou OFF.');
  }
  return {
    width,
    height,
    prompt: args.prompt,
    quantity: 1,
    prompt_enhance: promptEnhance,
  };
}

function v2Guidances(args, model) {
  if (!args['reference-id']) {
    if (args['reference-type'] || args['reference-strength']) {
      throw new Error('--reference-type e --reference-strength exigem --reference-id.');
    }
    return undefined;
  }
  const ids = args['reference-id'].split(',').map((id) => id.trim()).filter(Boolean);
  if (ids.length === 0 || ids.length > 6) {
    throw new Error('--reference-id deve conter entre 1 e 6 IDs separados por virgula.');
  }
  const imageType = String(args['reference-type'] || 'UPLOADED').toUpperCase();
  if (!['UPLOADED', 'GENERATED'].includes(imageType)) {
    throw new Error('--reference-type deve ser UPLOADED ou GENERATED.');
  }
  if (model === 'gpt-image-2' && args['reference-strength']) {
    throw new Error('gpt-image-2 nao aceita --reference-strength.');
  }
  const strength = String(args['reference-strength'] || 'MID').toUpperCase();
  if (model === 'seedream-4.5' && !['LOW', 'MID', 'HIGH'].includes(strength)) {
    throw new Error('--reference-strength deve ser LOW, MID ou HIGH.');
  }
  return {
    image_reference: ids.map((id) => ({
      image: { id, type: imageType },
      ...(model === 'seedream-4.5' ? { strength } : {}),
    })),
  };
}

function buildRequest(args) {
  if (!args.prompt) throw new Error('--prompt e obrigatorio para gerar imagem.');
  const model = args.model || 'lucid-origin';
  if (V2_MODELS.has(model)) {
    if (args['model-id']) throw new Error('--model-id nao deve ser usado com modelos v2.');
    if (args['negative-prompt']) throw new Error('--negative-prompt nao esta documentado para os modelos v2 suportados.');
    if (args.transparent) throw new Error('--transparent nao esta documentado para os modelos v2 suportados.');
    if (model === 'seedream-4.5') {
      if (args.quality) throw new Error('--quality e suportado por gpt-image-2, nao por seedream-4.5.');
      const style = String(args.style || 'DYNAMIC').toUpperCase();
      if (!SEEDREAM_STYLE_UUIDS[style]) {
        throw new Error('Style para seedream-4.5 deve ser DYNAMIC, CINEMATIC, CREATIVE, FASHION, PORTRAIT, STOCK_PHOTO ou VIBRANT.');
      }
      const parameters = v2CommonParameters(
        args,
        seedreamDimension(args.width, 1024, 'width'),
        seedreamDimension(args.height, 1024, 'height')
      );
      parameters.style_ids = [SEEDREAM_STYLE_UUIDS[style]];
      if (args.seed) {
        const seed = Number.parseInt(args.seed, 10);
        if (!Number.isInteger(seed) || seed < 0) throw new Error('--seed deve ser um inteiro nao negativo.');
        parameters.seed = seed;
      }
      const guidances = v2Guidances(args, model);
      if (guidances) parameters.guidances = guidances;
      return {
        endpoint: '/v2/generations',
        model,
        payload: { model, parameters, public: false },
      };
    }
    if (args.style) throw new Error('--style nao e documentado para gpt-image-2; use --quality.');
    if (args.seed) throw new Error('--seed nao e documentado para gpt-image-2 nesta integracao.');
    const quality = String(args.quality || 'MEDIUM').toUpperCase();
    if (!['LOW', 'MEDIUM', 'HIGH'].includes(quality)) {
      throw new Error('--quality deve ser LOW, MEDIUM ou HIGH.');
    }
    const dimensions = gptDimensions(args);
    const parameters = {
      ...v2CommonParameters(args, dimensions.width, dimensions.height),
      quality,
    };
    const guidances = v2Guidances(args, model);
    if (guidances) parameters.guidances = guidances;
    return {
      endpoint: '/v2/generations',
      model,
      payload: { model, parameters, public: false },
    };
  }
  if (!MODEL_ALIASES[model] && !args['model-id']) {
    throw new Error('Alias de modelo desconhecido. Use lucid-origin, lucid-realism, seedream-4.5 ou gpt-image-2.');
  }
  if (args.quality || args['prompt-enhance'] || args.seed || args['reference-id'] || args['reference-type'] || args['reference-strength']) {
    throw new Error('Opcoes quality, prompt-enhance, seed e reference-* sao exclusivas dos modelos v2.');
  }
  const style = String(args.style || 'DYNAMIC').toUpperCase();
  if (!STYLE_UUIDS[style]) {
    throw new Error(`Style nao reconhecido: ${style}. Use CINEMATIC, CREATIVE, DYNAMIC, FASHION, ILLUSTRATION, NONE, PORTRAIT, STOCK_PHOTO ou VIBRANT.`);
  }
  if (args.transparent) {
    throw new Error('--transparent ainda nao esta implementado com um modelo v1 oficialmente compativel nesta skill.');
  }
  const payload = {
    prompt: args.prompt,
    modelId: args['model-id'] || MODEL_ALIASES[model],
    width: legacyDimension(args.width, 1024, 'width'),
    height: legacyDimension(args.height, 1024, 'height'),
    num_images: 1, public: false, alchemy: false, ultra: false,
    contrast: 3.5, styleUUID: STYLE_UUIDS[style],
  };
  if (args['negative-prompt']) payload.negative_prompt = args['negative-prompt'];
  return { endpoint: '/v1/generations', model, payload };
}

async function apiJson(endpoint, key, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let result;
  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    result = { raw: text.slice(0, 300) };
  }
  if (!response.ok) {
    throw new Error(`Leonardo API respondeu HTTP ${response.status}: ${JSON.stringify(result).slice(0, 400)}`);
  }
  return result;
}

async function listModels(key) {
  const response = await apiJson('/v1/platformModels', key);
  const models = response.custom_models || response.models || [];
  if (!Array.isArray(models) || models.length === 0) {
    console.log('Nenhum modelo retornado ou formato de resposta desconhecido.');
    return;
  }
  for (const model of models) {
    console.log(`${model.name || model.modelName || 'sem-nome'}\t${model.id || model.modelId || 'sem-id'}`);
  }
  console.log(`Total: ${models.length}`);
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function pollGeneration(id, key, timeoutSeconds) {
  const deadline = Date.now() + timeoutSeconds * 1000;
  while (Date.now() < deadline) {
    const response = await apiJson(`/v1/generations/${id}`, key);
    const generation = response.generations_by_pk || response;
    const status = generation.status || 'UNKNOWN';
    const images = Array.isArray(generation.generated_images) ? generation.generated_images : [];
    if (['COMPLETE', 'COMPLETED'].includes(status) && images[0] && images[0].url) {
      return images[0].url;
    }
    if (['FAILED', 'ERROR', 'CANCELED'].includes(status)) {
      throw new Error(`Geracao ${id} terminou com status ${status}.`);
    }
    console.log(`Aguardando geracao ${id}: ${status}`);
    await wait(3000);
  }
  throw new Error(`Geracao ${id} nao terminou em ${timeoutSeconds}s. Consulte esse ID antes de criar outra.`);
}

function extensionFor(contentType, imageUrl) {
  const type = (contentType || '').toLowerCase();
  if (type.includes('png')) return '.png';
  if (type.includes('webp')) return '.webp';
  if (type.includes('jpeg') || type.includes('jpg')) return '.jpg';
  const ext = path.extname(new URL(imageUrl).pathname).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
}

async function downloadImage(imageUrl, destinationStem) {
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Download da imagem falhou: HTTP ${response.status}.`);
  const type = response.headers.get('content-type') || '';
  if (type && !type.toLowerCase().startsWith('image/')) {
    throw new Error(`Download retornou conteudo inesperado: ${type}.`);
  }
  const extension = extensionFor(type, imageUrl);
  const outputPath = `${destinationStem}${extension}`;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1024) throw new Error('Arquivo retornado e pequeno demais para uma imagem valida.');
  fs.writeFileSync(outputPath, bytes, { flag: 'wx' });
  return outputPath;
}

async function generate(args, projectRoot, key) {
  const request = buildRequest(args);
  const category = slug(args.category, '--category');
  const name = slug(args.name, '--name');
  const timeoutSeconds = args.timeout ? Number.parseInt(args.timeout, 10) : 180;
  if (!Number.isInteger(timeoutSeconds) || timeoutSeconds < 3 || timeoutSeconds > 1800) {
    throw new Error('--timeout deve ser um numero inteiro entre 3 e 1800 segundos.');
  }
  if (args['dry-run']) {
    console.log(JSON.stringify({ category, name, endpoint: request.endpoint, model: request.model, payload: request.payload }, null, 2));
    return;
  }
  const response = await apiJson(request.endpoint, key, {
    method: 'POST',
    body: JSON.stringify(request.payload),
  });
  const first = Array.isArray(response) ? response[0] : (response[0] || response);
  const generationId = response.sdGenerationJob?.generationId
    || response.generationId
    || response.generation_id
    || response.generate?.id
    || response.generate?.generationId
    || response.generation?.id
    || response.job?.id
    || response.id
    || first?.generationId
    || first?.generation_id
    || first?.id;
  if (!generationId) {
    const top = JSON.stringify(Object.keys(response));
    const firstKeys = first && typeof first === 'object' ? JSON.stringify(Object.keys(first)) : String(first);
    const msg = first?.message || '';
    throw new Error(`A API nao retornou generationId. Campos raiz: ${top}. Campos first: ${firstKeys}. Mensagem: ${msg}`);
  }
  console.log(`Geracao iniciada: ${generationId}`);
  const imageUrl = await pollGeneration(generationId, key, timeoutSeconds);
  const outputDir = path.join(projectRoot, 'assets', 'images', category);
  fs.mkdirSync(outputDir, { recursive: true });
  const filenameStem = `${name}-${slug(request.model, 'modelo')}-leonardo-${generationId.slice(0, 8)}`;
  const outputPath = await downloadImage(imageUrl, path.join(outputDir, filenameStem));
  console.log(`Imagem salva: ${outputPath}`);
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
    if (args.help || process.argv.length === 2) {
      usage();
      return;
    }
    const projectRoot = findProjectRoot();
    if (args['dry-run']) {
      await generate(args, projectRoot, '');
      return;
    }
    const key = apiKey(projectRoot);
    if (args['list-models']) {
      await listModels(key);
      return;
    }
    await generate(args, projectRoot, key);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
