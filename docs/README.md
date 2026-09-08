# mui-flexy Documentation

This directory contains the documentation for mui-flexy, showcasing all supported MUI versions (v5, v6, v7, and v9; MUI skipped v8).

## Building the Documentation

### Using Webpack (recommended for development)

```bash
# From the root directory
yarn dev:docs

# Or from the docs directory
yarn install
yarn build
```

### Using Rollup (recommended for production)

```bash
# From the root directory
yarn build:docs
```

## Development and Serving

### Development server (with hot reload)

```bash
# From the root directory
yarn dev:docs

# Or from the docs directory
yarn dev
```

### Serving built documentation

```bash
# From the root directory
yarn docs

# Or from the docs directory
yarn serve
```

## Documentation Structure

- `Docs.tsx` - Main documentation component
- `index.html` - Interactive docs with version switching (v5, v6, v7, v9)
- `static/docs.js` - Compiled documentation bundle
- `static/v5.js`, `static/v6.js`, `static/v7.js`, `static/v9.js` - Version-specific package bundles
- `webpack.config.js` - Webpack configuration for development
- `package.json` - Documentation dependencies and scripts

## HTML Files

The documentation uses ESM imports and external dependencies loaded from CDN:

- **index.html**: Loads MUI (v5/v6/v7/v9 via import maps) and the documentation bundle

The compiled JavaScript bundle (`static/docs.js`) dynamically switches between MUI versions based on the selected version in the UI.

## Development

The documentation is built with:

- React 18
- TypeScript
- MUI Material-UI (v5, v6, v7, v9)
- Webpack (for development)
- Rollup (for production builds)

The component demonstrates all mui-flexy features across the supported MUI versions (v5, v6, v7, and v9) with interactive examples and version switching.
