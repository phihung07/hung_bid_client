import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inject from '@rollup/plugin-inject'

export default defineConfig({
    plugins: [
        react(),
        inject({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
})
