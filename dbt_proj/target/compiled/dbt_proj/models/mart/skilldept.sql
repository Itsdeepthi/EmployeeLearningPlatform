

WITH

stg_skills AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_skills
),

stg_users AS (
    SELECT
        *
    FROM EMPLOYEE_LEARNING.PUBLIC_staging.stg_users
),

skillset_dept as(
SELECT 
    u.DEPARTMENT,
    s.SKILL,
    COUNT(DISTINCT u._ID) AS User_Count
FROM 
    users u
JOIN 
    skills s ON u._ID = s.USERID
GROUP BY 
    u.DEPARTMENT,
    s.SKILL
ORDER BY 
    u.DEPARTMENT,
    User_Count DESC
)

SELECT * FROM skillset_dept