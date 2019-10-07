export default class Loader {

    private stylesheets: Array<string> = [];
    private functionsOnLoad: Array<() => void> = [];

    addStylesheet(name: string): void {
        this.stylesheets.push(name);
    }

    addOnload(func: any): void {
        this.functionsOnLoad.push(func);
    }

    loadContent(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.stylesheets.forEach(name => {
                const style = document.createElement('link');
                style.setAttribute('rel', 'stylesheet');
                style.setAttribute('href', 'dist/css/' + name + '.css');
                document.getElementsByTagName('head')[0].appendChild(style);
            });

            this.functionsOnLoad.forEach(func => {
                func();
            })
        });
    }

}
