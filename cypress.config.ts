import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
   // 'baseUrl': 'http://localhost:4200' //змінимо на 8080
    'baseUrl': 'http://localhost:8080'
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})