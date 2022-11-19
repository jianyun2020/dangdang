import { CommonServerOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import dotenv, {DotenvParseOutput} from 'dotenv'
// https://vitejs.dev/config/
// 对象写法
// export default defineConfig({
//   plugins: [vue()]
// })

// 函数写法
export default defineConfig((mode) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  let server: CommonServerOptions = {}
  const envData = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envData)

  console.log(envMap)

  if (mode.mode === 'development') {
    server = {
      host: envMap.VITE_HOST,
      port: Number(envMap.VITE_PORT),
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN
        }
      }
    }
  } else if (mode.mode === 'production') {
    server = {
      port: Number(envMap.VITE_PORT),
      host: envMap.VITE_HOST
    }
  }
  console.log('环境：', server)



  return {
    plugins: [vue()],
    server
  }
})