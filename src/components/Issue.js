import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useRoles } from "../contexts/RoleContext";
import { useIssues } from "../contexts/IssuesContext";

import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import ConfirmPopup from "./ConfirmPopup";

import { db } from "../firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Issue = ({
  issueID,
  uid,
  author,
  subject,
  description,
  issueType,
  priority,
  category,
  dateCreated,
  dueDate,
  assignee,
  status,
  comments,
  handleClick,
  setDisplayIssue,
  addComment,
  updateComments,
  updatedBy,
  dateUpdated
}) => {
  const { currentUser } = useAuth();
  const { isAdmin } = useRoles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [makeComment, setMakeComment] = useState(false);
  //const modifyDeletePrivilege = currentUser.uid === uid;
  const modifyDeletePrivilege =
    currentUser.uid === uid || isAdmin(currentUser.uid);
  const modifyPrivilege = assignee === currentUser.displayName;
  console.log("issue permissions", assignee === currentUser.displayName);
  const { setFetchData } = useIssues();
  const handleDelete = () => {
    try {
      deleteIssue(issueID);
    } catch {
      setError("Issue not submitted");
    }
    setLoading(false);
  };

  const deleteIssue = async (id) => {
    await db
      .collection("issues")
      .where("issueID", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      })
      .then(() => {
        setFetchData((prev) => prev + 1);
      });

    setDisplayIssue(null);
  };

  return (
    <div key={issueID} className="issue-card">
      <Button
        style={{ position: "relative", float: "right" }}
        variant="secondary"
        onClick={handleClick}
      >
        close
      </Button>

      {modifyDeletePrivilege || modifyPrivilege ? (
        <div style={{ margin: "0 0 1rem 0" }}>
          <Link
            className="navlink-edit"
            to="/edit-issue"
            state={{
              issueID,
              uid,
              author,
              subject,
              description,
              issueType,
              priority,
              category,
              dateCreated,
              dueDate,
              assignee,
              status
            }}
          >
            <Button
              variant="warning"
              id="edit-button"
              style={{ marginRight: ".5rem" }}
              onClick={() => setDisplayIssue(null)}
            >
              Edit
            </Button>
          </Link>
          {modifyDeletePrivilege && (
            <Button
              variant="danger"
              onClick={() => setPopup(true)}
              style={{ position: "relative", margin: "0 1rem" }}
              disabled={!modifyDeletePrivilege}
            >
              Delete
            </Button>
          )}
        </div>
      ) : null}

      <div className="card-head">
        <h2 className="header-title">{subject}</h2>
        <div className="header-row">
          <div className="header-column">
            <p className="header-element">Created: {dateCreated[1]}</p>
            <p className="header-element">-{author}</p>
            <p className="header-element">Assigned to: {assignee}</p>
          </div>
          <div className="header-column header-column2">
            {dateUpdated && (
              <p className="header-element">Updated: {dateUpdated[1]}</p>
            )}
            {updatedBy && <p className="header-element">-{updatedBy}</p>}
            <p className="header-element">Due: {dueDate[1]}</p>
          </div>
        </div>
      </div>
      <div className="issue-card-body">
        <div className="issue-row">
          <div className="double-issue-column">
            <div
              className="text-box issue-element"
              style={{ display: "block" }}
            >
              <span
                className="issue-element-title"
                style={{ display: "block" }}
              >
                Description{" "}
              </span>
              <span className="issue-element-value">{description}</span>
            </div>
          </div>
        </div>

        <div className="issue-row">
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Type </span>
              <span className="issue-element-value">{issueType}</span>
            </div>
          </div>
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Category </span>
              <span className="issue-element-value">{category}</span>
            </div>
          </div>
        </div>
        <div className="issue-row">
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Status </span>
              {status}
            </div>
          </div>
          <div className="issue-column">
            <div className="issue-element">
              <span className="issue-element-title">Priority </span>
              {priority}
            </div>
          </div>
        </div>

        <div className="comment-list double-issue-section">
          <CommentDisplay
            issueID={issueID}
            uid={uid}
            comments={comments}
            updateComments={updateComments}
          />
        </div>

        {!makeComment ? (
          <>
            <Button variant="primary" onClick={() => setMakeComment(true)}>
              New Comment
            </Button>
          </>
        ) : null}

        {makeComment ? (
          <CommentForm
            issueID={issueID}
            comments={comments}
            addComment={addComment}
            closeComment={setMakeComment}
          />
        ) : null}
      </div>
      {popup ? (
        <ConfirmPopup handleDelete={handleDelete} setPopup={setPopup} />
      ) : null}
    </div>
  );
};

export default Issue;
