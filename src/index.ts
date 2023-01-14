import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Roy Kathurima';
  greetUser(name);
});
