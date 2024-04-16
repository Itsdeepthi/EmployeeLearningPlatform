

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

skill_dist_dept AS(
    SELECT 
    u.DEPARTMENT,
    s.SKILL,
    AVG(s.EXPERIENCE) AS Avg_Experience,
    MIN(s.EXPERIENCE) AS Min_Experience,
    MAX(s.EXPERIENCE) AS Max_Experience,
    COUNT(s._ID) AS Skill_Count
FROM 
    stg_users u
JOIN 
    stg_skills s ON u._ID = s.USERID
GROUP BY 
    u.DEPARTMENT,
    s.SKILL
ORDER BY 
    u.DEPARTMENT,
    Avg_Experience DESC
)

SELECT * FROM skill_dist_dept