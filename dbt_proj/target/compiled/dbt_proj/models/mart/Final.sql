

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

stg_users AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_users
),

final AS (
    SELECT
    u._ID AS User_ID,
    u.FULLNAME AS User_FullName,
    u.USERNAME AS User_Username,
    u.PHONENUMBER AS User_PhoneNumber,
    u.EMAILID AS User_Email,
    u.DEPARTMENT AS User_Department,
    u.ROLE AS User_Role,
    s.SKILL AS User_Skill,
    s.EXPERIENCE AS User_Experience,
    s.STRENGTH AS User_Strength,
    te._ID AS Event_ID,
    te.TITLE AS Event_Title,
    te.DOMAIN AS Event_Domain,
    te.DATE AS Event_Date,
    te.DURATION AS Event_Duration,
    te.TRAINERNAME AS Event_Trainer,
    te.LOCATION AS Event_Location,
    te.DESC AS Event_Description,
    te.CAPACITY AS Event_Capacity,
    te.CURRENTCAPACITY AS Event_CurrentCapacity
FROM
    users u
JOIN
    skills s ON u._ID = s.USERID
JOIN
    userregisters ur ON u._ID = ur.USERID
JOIN
    events te ON ur.EVENTID = te._ID
)

SELECT * from final