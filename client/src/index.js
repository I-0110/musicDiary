import { createRoot } from 'react-dom';

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

root.render(<h1>Music Time!</h1>);

