import React, { useState } from "react";
import AllContactsModal from "./Modals/AllContactsModal";
import "./Style.css";
import USContactsModal from "./Modals/USContactsModal";

const Problem2 = () => {
  const [showALLContactsModal, setAllContactsModal] = useState(false);
  const [showUSContactsModal, setUSContactsModal] = useState(false);

  const handleModal = (prop, all) => {
    if (all) {
      setAllContactsModal(prop);
      setUSContactsModal(false);
    } else {
      setUSContactsModal(prop);
      setAllContactsModal(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => handleModal(true, true)}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => handleModal(true, false)}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>
      <div>
        {/* All Contacts */}
        {showALLContactsModal && <AllContactsModal {...{ handleModal }} />}
      </div>
      <div>
        {/* US Contacts */}
        {showUSContactsModal && <USContactsModal {...{ handleModal }} />}
      </div>
    </div>
  );
};

export default Problem2;
