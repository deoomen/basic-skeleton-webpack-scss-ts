// styles
import '../../scss/home';

// scripts
import Main from '../main';

class Home extends Main {

    constructor() {
        super();

        this.loader.addStylesheet('home');
        this.loader.loadContent();
    }

}

const home = new Home();
