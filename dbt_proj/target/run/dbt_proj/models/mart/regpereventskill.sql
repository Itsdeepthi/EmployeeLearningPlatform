
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_mart.regpereventskill
         as
        (

WITH
stg_skills AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_skills
),

stg_events AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_events
),

stg_userregisters AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_userregisters
),

registrations_per_event AS (
    SELECT
    te._ID AS Event_ID,
        te.TITLE AS Event_Title,
        te.DOMAIN AS Event_Domain,
        te.DATE AS Event_Date,
        te.DURATION AS Event_Duration,
        te.TRAINERNAME AS Event_Trainer,
        te.LOCATION AS Event_Location,
        te.DESC AS Event_Description,
        te.CAPACITY AS Event_Capacity,
        te.CURRENTCAPACITY AS Event_CurrentCapacity,
        s.SKILL AS User_Skill,
        COUNT(ur._ID) AS Registrations_Count
FROM
    stg_events te
JOIN
    stg_userregisters ur ON te._ID = ur.EVENTID
    JOIN
        stg_skills s ON ur.USERID = s.USERID
    GROUP BY
        te._ID,
        te.TITLE,
        te.DOMAIN,
        te.DATE,
        te.DURATION,
        te.TRAINERNAME,
        te.LOCATION,
        te.DESC,
        te.CAPACITY,
        te.CURRENTCAPACITY,
        s.SKILL
    ORDER BY
        Registrations_Count DESC,
        Event_ID,
        User_Skill
)

SELECT * FROM registrations_per_event
        );
      
  