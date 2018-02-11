// import jsdom from 'jsdom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

global.requestAnimationFrame = callback => setTimeout(callback, 0);

Enzyme.configure({ adapter: new Adapter()});