import React from 'react';
import {Link} from "react-router-dom";


export default function Nav() {


  return (
    <nav className="flex flex-auto items-center justify-around flex-wrap p-6 w-full">
      <div className="flex justify-items-end">

        <h1 className="flex-1 text-6xl tracking-wide font-custom w-full">Petful</h1>

      </div>
      <div className="w-full flex-1 p-2 text-center md:text-right lg:mr-16 ">
        <div className="text-2xl md:text-3xl font-narrow tracking-wide flex-1">
          <Link to="/"> <div className="flex-1 mt-4 mx-4 lg:mr-16 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
</div></Link>
          <Link to="/adopt"><div className="flex-1 mt-4 mx-4 lg:mr-16 text-teal-200 hover:text-white mr-4">
            Adopt
</div></Link>
          <Link to="/about"><div className="flex-1 mt-4 mx-4 lg:mr-16 text-teal-200 hover:text-white mr-4">
            About
</div></Link>
        </div>

      </div>
    </nav>
  )

}
