// global styles
import '../scss/main';

// global scripts
// eg.: import 'bootstrap' or import './myscripts'
import Loader from './utils/loader';

export default class Main {

    protected loader: Loader;

    constructor() {
        this.loader = new Loader();
        this.loader.addStylesheet('main');
    }

}
