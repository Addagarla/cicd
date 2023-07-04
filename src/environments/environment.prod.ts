export const environment = {
  production: true,
  hmr: false,
  authUserConfig: {
    apiBaseUrl: 'https://admin.healthliv.co.in:9090',
    endpoints: {
      login: {
        method: 'POST',
        path: 'healthliv/user/adminLogin'
      },
      sendNotification: {
        method: 'POST',
        path: 'healthliv/user/sendNotification'
      }
    }
  }
};
