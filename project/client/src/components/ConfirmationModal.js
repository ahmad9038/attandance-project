import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Spinner,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useClassContext } from "../context/ClassContext";

const ConfirmationModal = ({ isOpen, onClose, selectedClass }) => {
  const { refresh } = useClassContext();
  const [loading, setLoading] = useState(false);
  //delete class
  const deleteClass = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:5000/class/deleteClass/${selectedClass._id}`
      );
      setLoading(false);
      onClose();
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this class?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => deleteClass()}>
            {loading ? <Spinner color="white" /> : "Confirm"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
