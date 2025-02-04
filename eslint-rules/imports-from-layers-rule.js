import path from 'path';

export default {
  rules: {
    'enforce-layered-architecture': {
      meta: {
        type: 'problem',
        fixable: 'code',
        docs: {
          description:
            'Enforce layered architecture, where modules can import only from the next layer.',
        },
        schema: [],
        messages: {
          coreImport: "Module 'core' can't depend on any other module.",
          infraImport: "Module 'infrastructure' can import only 'core'.",
          businessImport: "Module 'business' can import only 'infrastructure'.",
          presentationImport: "Module 'presentation' can import only 'business'.",
          selfImport: 'Modules can only import themselves, not other layers.',
        },
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            const filePath = context.filename;

            // Normalize the file path to ensure consistent use of slashes
            const normalizedFilePath = path.normalize(filePath);
            const pathnameWithNormalizedSlashes = normalizedFilePath.replace(/\\/g, '/');

            let hasFix = false;

            // Extract the layer from the file path
            const layers = ['core', 'infrastructure', 'business', 'presentation'];
            const alias = ['@core', '@infrastructure', '@business', '@presentation'];
            const importPathWithAlias = importPath.split('/')[0];

            const currentLayer = layers.find(layer =>
              pathnameWithNormalizedSlashes.includes(`/${layer}/`),
            );

            console.log('normalizedFilePath', normalizedFilePath);
            console.log('pathnameWithNormalizedSlashes', pathnameWithNormalizedSlashes);
            console.log('currentLayer', currentLayer);
            console.log('importPath', importPath.split('/')[0]);

            // Skip if the file doesn't belong to one of the defined layers
            if (!currentLayer) return;

            // Allow imports from third-party libraries (anything starting with '@' or a package name)
            if (importPath.startsWith('@') && !alias.includes(importPathWithAlias)) {
              console.log('Inside third-party');
              return;
            }

            // Allow self-imports (imports within the same layer)
            if (importPath.startsWith(`@${currentLayer}/`)) {
              console.log('Inside self-import');
              return;
            }

            // Now, apply the import restrictions based on the current layer
            if (currentLayer === 'core' && alias.includes(importPathWithAlias)) {
              console.log('Inside core');
              hasFix = true;
              context.report({
                node,
                messageId: 'coreImport',
                fix(fixer) {
                  return fixer.remove(node); // Remove the invalid import
                },
              });
            }

            if (currentLayer === 'infrastructure' && alias.includes(importPathWithAlias)) {
              if (!importPath.startsWith('@core/') && importPath.startsWith('@')) {
                hasFix = true;
                context.report({
                  node,
                  messageId: 'infraImport',
                  fix(fixer) {
                    return fixer.remove(node); // Remove the invalid import
                  },
                });
              }
            }

            if (currentLayer === 'business' && alias.includes(importPathWithAlias)) {
              if (!importPath.startsWith('@infrastructure/') && importPath.startsWith('@')) {
                hasFix = true;
                context.report({
                  node,
                  messageId: 'businessImport',
                  fix(fixer) {
                    return fixer.remove(node); // Remove the invalid import
                  },
                });
              }
            }

            if (currentLayer === 'presentation' && alias.includes(importPathWithAlias)) {
              if (!importPath.startsWith('@business/') && importPath.startsWith('@')) {
                hasFix = true;
                context.report({
                  node,
                  messageId: 'presentationImport',
                  fix(fixer) {
                    return fixer.remove(node); // Remove the invalid import
                  },
                });
              }
            }

            // If no fixes were found, return null
            if (!hasFix) {
              return null;
            }
          },
        };
      },
    },
  },
};
