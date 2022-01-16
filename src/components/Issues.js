import React, { useState, useContext } from "react";
//import { Card, Button } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
// import { db } from '../firebase';
import { useIssues } from "../contexts/IssuesContext";
import IssueTable from "./IssueTable";
import Issue from "./Issue";
//import IssuesContext from '../contexts/IssuesContext';

const Issues = () => {
  const { displayIssue, setDisplayIssue, issues } = useIssues();
  //   const { issues, setIssues } = useContext(IssuesContext);
  //const [displayIssue, setDisplayIssue] = useState(null);
  const [comments, setComments] = useState(null);
  //const { tickets, setTickets } = useContext(IssuesContext);
  // const { currentUser } = useAuth();
  // const { isLoggedIn, setIsLoggedIn } = useContext(IssuesContext);

  // React.useEffect(() => {
  // 	let unmounted = false;
  // 	if (!unmounted) {
  // 		if(currentUser) {
  // 			console.log("setting is logged in ")
  // 			setIsLoggedIn(true);
  // 		}
  // 	}
  // 	return () => { unmounted = true};
  // }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: "Issue Table",
        Footer: "Click on an item for details",
        columns: [
          {
            Header: "Author",
            accessor: "col0"
          },
          {
            Header: "Subject",
            accessor: "col1"
          },
          {
            Header: "IssueType",
            accessor: "col2"
          },
          {
            Header: "Category",
            accessor: "col3"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(
    () =>
      issues.map((issue) => {
        return {
          col0: issue.author,
          col1: issue.subject,
          col2: issue.issueType,
          col3: issue.category,
          priority: issue.priority,
          id: issue.issueID
        };
      }),
    [issues]
  );

  const handleClick = (e) => {
    if (displayIssue === null) {
      const issue = issues.filter((i) => i.issueID === e.target.id);
      const foundComments = issue[0].comments;
      if (foundComments) setComments(foundComments);

      setDisplayIssue(issue);
    } else {
      setComments(null);
      setDisplayIssue(null);
    }
  };

  const addComment = (c) => {
    comments ? setComments([...comments, c]) : setComments([c]);
  };

  const updateComments = (updatedComments) => {
    setComments([...updatedComments]);
  };

  return (
    <div className="centered-container">
      <h2 className="page-title">Issues</h2>
      {displayIssue ? (
        <Issue
          {...displayIssue[0]}
          comments={comments}
          addComment={addComment}
          updateComments={updateComments}
          setDisplayIssue={setDisplayIssue}
          handleClick={handleClick}
          className="issue"
        />
      ) : issues.length > 0 ? (
        <>
          <IssueTable columns={columns} data={data} handleClick={handleClick} />
        </>
      ) : (
        <p className="message">No Issues TABLE Available</p>
      )}
    </div>
  );
};

export default Issues;
