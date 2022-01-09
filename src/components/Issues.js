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

  // const issues = React.useMemo(() => [
  //   {
  //     subject: "Tasks",
  //     issueID: "195c7605-3b7b-873e-ass6-9618b2373c1e",
  //     dateCreated: [1640906725279, "Dec 30, 2021 15:25"],
  //     dateUpdated: [1641358172765, "Jan 4, 2022 20:49"],
  //     dueDate: [1637952550206, "Nov 26, 2021"],
  //     author: "Greg Schoenberg",
  //     uid: "z4dS77zgghYVQE657AOP5nCWwaU2",
  //     description: "format comment display",
  //     issueType: "new feature",
  //     category: "back end",
  //     priority: "high",
  //     status: "inProgress",
  //     updatedBy: "Demo Admin",
  //     comments: [
  //       {
  //         uid: "Jrr3NiNUL9QaSZbKMyzIRi22rZl2",
  //         date: "Nov 26 2021 10:38",
  //         commentID: "131ad969-a7b3-cd48-a445-c064b4f7837d",
  //         commentText: "new comment",
  //         author: "A"
  //       },
  //       {
  //         date: "Jan 04 2022 20:29",
  //         commentText: "test",
  //         uid: "tSRdQeeqPwUTZwWwFM0KwfCG6eP2",
  //         author: "Demo User",
  //         commentID: "eb12671a-e3e4-c7df-cd5b-c4c877415f5a"
  //       }
  //     ]
  //   },
  //   {
  //     subject:
  //       "Tasks which have a very long title to test the limits of the table",
  //     issueID: "195c7605-3b7b-873e-d156-9618b2373c1e",
  //     dateCreated: [1637952571299, "Nov 26, 2021 10:49"],
  //     dueDate: [1637952550206, "Nov 26, 2021"],
  //     author: "Greg Schoenberg",
  //     uid: "z4dS77zgghYVQE657AOP5nCWwaU2",
  //     description: "Removed commenting,  format comment display",
  //     issueType: "new feature",
  //     category: "back end",
  //     priority: "medium",
  //     status: "inProgress",
  //     updatedBy: "Demo Admin",
  //     comments: [
  //       {
  //         uid: "Jrr3NiNUL9QaSZbKMyzIRi22rZl2",
  //         date: "Nov 26 2021 10:38",
  //         commentID: "131ad969-a7b3-cd48-a445-c064b4f7837d",
  //         commentText: "new comment",
  //         author: "A"
  //       },
  //       {
  //         date: "Jan 04 2022 20:29",
  //         commentText: "test",
  //         uid: "tSRdQeeqPwUTZwWwFM0KwfCG6eP2",
  //         author: "Demo User",
  //         commentID: "eb12671a-e3e4-c7df-cd5b-c4c877415f5a"
  //       }
  //     ]
  //   },
  //   {
  //     subject: "Second Task",
  //     issueID: "195c7605-3b7b-873e-d156-9618b2373c1e",
  //     dateCreated: [1637126191748, "Nov 16, 2021 21:16"],
  //     dueDate: [1637644498000, "Nov 22, 2021"],
  //     author: "A",
  //     uid: "Jrr3NiNUL9QaSZbKMyzIRi22rZl2",
  //     description:
  //       "-Added commenting,  format comment display, make comments persistent upon edit\n\ncolor for issues table based on priority\n\n-filter by priority or issue",
  //     issueType: "bug",
  //     category: "front end",
  //     priority: "low",
  //     status: "open",
  //     comments: [
  //       {
  //         uid: "Jrr3NiNUL9QaSZbKMyzIRi22rZl2",
  //         date: "Nov 26 2021 10:38",
  //         commentID: "131ad969-a7b3-cd48-a445-c064b4f7837d",
  //         commentText: "new comment",
  //         author: "A"
  //       },
  //       {
  //         date: "Jan 04 2022 20:29",
  //         commentText: "test",
  //         uid: "tSRdQeeqPwUTZwWwFM0KwfCG6eP2",
  //         author: "Demo User",
  //         commentID: "eb12671a-e3e4-c7df-cd5b-c4c877415f5a"
  //       }
  //     ]
  //   }
  // ]);

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
