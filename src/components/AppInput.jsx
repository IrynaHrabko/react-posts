/* eslint-disable react/prop-types */
const AppInput = (
  {
    propsName,
    propsType,
    propsPlaceholder,
    inputHandler,
    propsValue,
  }
) => {


  return (
    <input type={propsType} defaultValue={propsValue} onInput={inputHandler} placeholder={propsPlaceholder} name={propsName}/>
  )
}

export default AppInput