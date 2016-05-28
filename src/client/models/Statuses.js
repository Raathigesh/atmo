import Status from './Status';

export const deploying = new Status('selected radio', 'Deployment in progress...', 'Deploying', 'blue');
export const deployed = new Status('checkmark', 'Successfully deployed the changes.', 'Deployed', 'green');
export const failed = new Status('remove', 'Deployment failed. Check console for error log.', 'Failed', 'red');