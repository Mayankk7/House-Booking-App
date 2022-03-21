import React from 'react'

const KommunicateChat = () => {

    (function (d, m) {
        var kommunicateSettings =
            { "appId": "ea298024a1e46b754a8414840bfdc9f1", "popupWidget": true, "automaticChatOpenOnNavigation": true };
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    return (
        <div></div>
    )
}

export default KommunicateChat