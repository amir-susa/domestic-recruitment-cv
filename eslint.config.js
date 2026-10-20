import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'src/components/FormPageOne.tsx',
    'src/components/FormPageTwo.tsx',
    'src/components/LanguageSkillsTable.tsx',
    'src/components/LegacyCVGenerator.tsx',
    'src/components/SkillsGrid.tsx',
    'src/components/UnifiedCandidateForm.tsx',
    'src/pdf/native-templates.tsx',
    'src/pdf/pdf-viewer.tsx',
    'src/pdf/tesnim-form-factory.tsx',
    'src/pdf/tesnim-form-renderer.tsx',
    'src/pdf/tesnim-form-view.ts',
    'src/pdf/tesnim-image-service.ts',
    'src/pdf/tesnim-page-header.tsx',
    'src/pdf/tesnim-pdf-generator.ts',
    'src/pdf/tesnim-skill-options.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
