import React from 'react';


export default function PetCards(props) {

  const {age, breed, description, story, imageURL, name, notAvailable}=props;


  return (
    <div>
      <img className="w-full" id="adopt" src={imageURL} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        {notAvailable===true&&<h2 className="text-red-600 font-bold text-xl">Pet not available</h2>}
        <div className="font-bold text-2xl tracking-widest mb-2">{name}</div>
        <p className="text-gray-700 text-base" >{age}</p>
        <p className="text-gray-700 font-bold text-base" >{breed}</p>
        <p className="text-gray-700 text-base" > {description}</p>
        <p className="text-gray-700 text-base" >  {story}</p>
      </div>
    </div>
  )

}
