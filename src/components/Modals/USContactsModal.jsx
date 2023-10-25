import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const USContactsModal = ({ handleModal }) => {
  const [showEven, setShowEven] = useState(false);
  const [UsContactsData, setUSContacts] = useState([]);
  const [page, setPage] = useState(1);
  const modalRef = useRef();

  const fetchUSContacts = async () => {
    try {
      const response = await axios.get(
        `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${page}`
      );
      if (page === 1) {
        setUSContacts((pre) => [...response?.data?.results]);
      } else {
        setUSContacts((pre) => [...pre, ...response?.data?.results]);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchUSContacts();
  }, [page]);

  const handleScroll = () => {
    const modal = modalRef.current;
    if (modal.scrollTop + modal.clientHeight >= modal.scrollHeight) {
      console.log(page);
      setPage((pre) => pre + 1);
    }
  };

  const handleCheckboxChange = () => {
    setShowEven(!showEven);
  };

  const evenIdContacts = UsContactsData.filter(
    (contact) => contact.id % 2 === 0
  );
  return (
    <div>
      <div>
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title mx-auto fw-bold"> US Contacts</h4>
              </div>
              <div
                className="modal-body"
                onScroll={handleScroll}
                ref={modalRef}
              >
                {showEven
                  ? evenIdContacts.map((contact, index) => (
                      <div className="card p-3 m-1" key={index}>
                        <div className="px-5 py-1 rounded mx-auto mb-3 border border-info fw-bold">
                          NO : {contact.id}
                        </div>
                        <div>
                          <p className="mb-0">
                            <strong> Country Name : </strong>
                            {contact.country.name}
                          </p>
                          <p className="mb-0">
                            <strong>Phone Number : </strong>
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                    ))
                  : UsContactsData?.map((contact, index) => (
                      <div className="card p-3 m-1" key={index}>
                        <div className="px-5 py-1 rounded mx-auto mb-3 border border-info fw-bold">
                          NO : {contact.id}
                        </div>
                        <div>
                          <p className="mb-0">
                            <strong> Country Name : </strong>
                            {contact.country.name}
                          </p>
                          <p className="mb-0">
                            <strong>Phone Number : </strong>
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="modal-footer">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={showEven}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Only even
                  </label>
                </div>
                <div className="modal-footer border-0">
                  <button
                    onClick={() => handleModal(true, true)}
                    type="button"
                    className="btn modal-button"
                  >
                    All Contacts
                  </button>
                  <button
                    onClick={() => handleModal(true, false)}
                    type="button"
                    className="btn modal-buttonB"
                  >
                    US Contacts
                  </button>
                  <button
                    type="button"
                    className="btn modal-buttonC"
                    onClick={() => handleModal(false, true)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USContactsModal;
