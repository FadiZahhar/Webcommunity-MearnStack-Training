import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap";

const ContactItem = ({ contact }) => {
  const { name, email, phone, type } = contact;

  return (
    <Card className="mb-3 bg-dark text-light">
      <CardBody>
        <CardTitle className="d-flex justify-content-between align-items-center">
          <span className="text-primary">{name}</span>
          <Badge
            color={type === "professional" ? "success" : "primary"}
            className="ml-2"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </CardTitle>
        <ul className="list-unstyled">
          {email && (
            <li>
              <i className="fas fa-envelope-open mr-2"></i> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone mr-2"></i> {phone}
            </li>
          )}
        </ul>
        <div className="d-flex justify-content-end">
          <Button color="info" size="sm" className="mr-2">
            Edit
          </Button>
          <Button color="danger" size="sm">
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
