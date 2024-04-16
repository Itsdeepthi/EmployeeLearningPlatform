
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC_mart.activeuserindomain
         as
        (

WITH

stg_events AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_events
),

stg_users AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_users
),

stg_userregisters AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_userregisters
),

UserRegistrationCounts AS (
    SELECT 
        u._ID AS UserID,
        t.DOMAIN,
        COUNT(ur._ID) AS RegistrationCount,
        ROW_NUMBER() OVER(PARTITION BY t.DOMAIN ORDER BY COUNT(ur._ID) DESC) AS Rank
    FROM 
        stg_users u
    JOIN 
        stg_userregisters ur ON u._ID = ur.USERID
    JOIN 
        stg_events t ON ur.EVENTID = t._ID
    GROUP BY 
        u._ID,
        t.DOMAIN
)

SELECT 
    u.FULLNAME AS MostActiveUser,
    ur.DOMAIN,
    ur.RegistrationCount
FROM 
    UserRegistrationCounts ur
JOIN 
    stg_users u ON ur.UserID = u._ID
WHERE 
    ur.Rank = 1
ORDER BY 
    ur.DOMAIN
        );
      
  