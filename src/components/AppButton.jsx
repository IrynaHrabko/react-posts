const AppButton = ({label, clickHandler}) => {

  return(
    <button onClick={() => clickHandler()}>
      {label}
    </button>
  )
}


export default AppButton