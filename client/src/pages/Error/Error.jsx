import React from "react";




function Error() {
    return (
        <div className="container d-flex justify-content-center flex-column" style={{'height':'40rem'}}>
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Error 404</h1>
                </div>
            </div>
            <div className="row">
                <div className="pt-2">
                    <h3 className="text-center">La pagina que buscas no existe</h3>
                </div>
            </div>

        </div>
    );
}

export default Error;