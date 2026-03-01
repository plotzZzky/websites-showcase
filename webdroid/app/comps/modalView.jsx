

export default function ViewApp(props) {
  console.log(props.modalData)
  const appName = props.modalData.name;
  const version = props.modalData.version;
  const license = props.modalData.license;
  const description = props.modalData.description;

  const iconAlt = `Icone do ${appName}`;
  const iconUrl = (props.modalData.icon? 
    "https://f-droid.org/repo/" + props.modalData.icon 
    : "https://f-droid.org/assets/ic_repo_app_default_KNN008Z2K7VNPZOFLMTry3JkfFYPxVGDopS1iwWe5wo=.png"
  )

  const apkUrl = "https://f-droid.org/repo/" + props.modalData.apk;
  const fdroidUrl = "https://f-droid.org/pt_BR/packages/" + props.modalData.apk?.split("_")[0];
  const codeUrl = props.modalData.code;
  const appHash = props.modalData.hash;

  function goToDowload() {
    window.open(apkUrl);
  };

  function goToHash() {
    navigator.clipboard.writeText(appHash);
    alert("Hash copied!")
  }

  function goToFdroid () {
    window.open(fdroidUrl, "_blank");
  };

  function gotoSourcecode () {
    if (codeUrl) {
      window.open(codeUrl, "_blank");

    } else {
      alert("Esse projeto não disponibiliza um link para o codigo fonte.");
    }
  };

  if (props.showModal) {
    return (
      <div id="Modal" onClick={props.showModalViewApp}>
        <div id="ModalView" onClick={e => e.stopPropagation()}>
          <div className="div-name" >
            <img src={iconUrl} alt={iconAlt} />

            <div className="align-data">
              <h3>{appName}</h3>
              <a> version: {version} - {license}</a>
            </div>
          </div>

          <div id="appDescription" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />

          <div id="align-btns">
            <button onClick={goToDowload}>
              Download
            </button>

            <button onClick={goToHash}>
              Copy hash
            </button>

            <button onClick={goToFdroid}>
              F-droid
            </button>

            <button onClick={gotoSourcecode}>
              Source code
            </button>
          </div>

        </div>
      </div>
    )
  }
}