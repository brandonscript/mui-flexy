# mui-flexy Documentation

This directory contains the documentation for mui-flexy, showcasing all three supported MUI versions (v5, v6, and v7).

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
- `index.html` - MUI v7 documentation (default)
- `index_v5.html` - MUI v5 documentation
- `static/docs.js` - Compiled documentation bundle
- `webpack.config.js` - Webpack configuration for development
- `package.json` - Documentation dependencies and scripts

## HTML Files

The documentation uses ESM imports and external dependencies loaded from CDN:

- **index.html**: Loads MUI v7 and the documentation bundle
- **index_v5.html**: Loads MUI v5 and the documentation bundle

Both files reference the same compiled JavaScript bundle (`static/docs.js`) which dynamically switches between MUI versions based on the selected version in the UI.

## Development

The documentation is built with:

- React 18
- TypeScript
- MUI Material-UI (v5, v6, v7)
- Webpack (for development)
- Rollup (for production builds)

The component demonstrates all mui-flexy features across the three supported MUI versions with interactive examples and version switching.
