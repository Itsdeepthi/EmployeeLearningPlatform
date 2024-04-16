{{ config(
    tags=['basic', 'staging'],
    materialized='table'
) }}

WITH

stg_skills AS (
    SELECT
        *
    FROM {{ ref('stg_skills') }}
),

stg_users AS (
    SELECT
        *
    FROM {{ ref('stg_users') }}
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
