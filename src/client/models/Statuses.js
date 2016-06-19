import Status from './Status';

export const deploying = new Status('selected radio', 'Deployment in progress...', 'Deploying', 'blue');
export const deployed = new Status('checkmark', 'API server is running!', 'Deployed', 'green');
export const failed = new Status('remove', 'Deployment failed. Check console for error log.', 'Failed', 'red');
export const initial = new Status('lightning', "click 'Deploy' to start!", '', 'gray');