
  
    

        create or replace transient table EMPLOYEE_LEARNING.PUBLIC.activeusers
         as
        (

WITH

stg_users AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.stg_users
),

stg_userregisters AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC.stg_userregisters
),

most_active_users AS (

SELECT 
    u._ID,
    u.FULLNAME,
    COUNT(ur._ID) AS Registration_Count
FROM 
    stg_users u
JOIN 
    stg_userregisters ur ON u._ID = ur.USERID
GROUP BY 
    u._ID,
    u.FULLNAME
ORDER BY 
    Registration_Count DESC
LIMIT 100

)

SELECT * FROM most_active_users
        );
      
  