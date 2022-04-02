
/**
 * Initialize an instance for using the RDKit with the window variable
 * allowing the use in any component.
 * 
 * The promise preserve a rule of just one instance declaration for the rdkit
 * in all application.
*/
const initRDKit = (() => {
    const script = document.createElement('script');
    script.src = '/static/RDKit_minimal.js';
    document.head.appendChild(script);

    // One the promise return an object from the C++ compiled library
    // we dont know the exact type of it
    let rdKitLoadingPromise: Promise<any>;

    return () => {
        if (!rdKitLoadingPromise) {
            // One the object come from the C++ lib and are storaged in window
            // we have to declare an interface for it
            rdKitLoadingPromise = new Promise((resolve, reject) => {
                (window as any).initRDKitModule().then((RDKit: any) => {

                    // Set local RDKit distribution to prefer coordgen
                    // coordinate system for better rendering of macrocycles
                    RDKit.prefer_coordgen(true);

                    // Set window property
                    (window as any).RDKit = RDKit;
                    resolve(RDKit);
                }).catch((__: Error) => {
                    reject();
                });
            });
        }
        return rdKitLoadingPromise;
    }
})();

export default initRDKit;