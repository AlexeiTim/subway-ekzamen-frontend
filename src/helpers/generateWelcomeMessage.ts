export const generateWelcomeMessage = (username: string) => {
  return  `Добро пожаловать${username ? ', ' + username :  ''}!` 
}
