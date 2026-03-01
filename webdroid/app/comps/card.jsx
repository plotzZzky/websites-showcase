export default function Card(props) {

  const iconUrl = (props.icon? 
    "https://f-droid.org/repo/" + props.icon 
    : "https://f-droid.org/assets/ic_repo_app_default_KNN008Z2K7VNPZOFLMTry3JkfFYPxVGDopS1iwWe5wo=.png"
  )

  const appName = () => {
    const splitedName = props.name.split('-')[0];

    if (props.name.length <= 12) {
      return props.name;
    }

    if (splitedName.length <= 12) {
      return props.name.slice(0, 16) + "...";

    } else {
      return splitedName.slice(0, 21) + "...";
    }
  }
  

  return (
    <article onClick={props.showModal}>
      <img src={iconUrl} />

      <span>
        {appName()}
      </span>

    </article>
  )
}