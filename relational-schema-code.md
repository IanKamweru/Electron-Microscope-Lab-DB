```
CREATE TABLE Project (
    project_name VARCHAR(50) PRIMARY KEY,
    supervising_professor VARCHAR(128),
    student_researchers VARCHAR(128)[],
    goal VARCHAR(1024),
    date DATE
);

CREATE TABLE Sample (
    sample_name VARCHAR(50) PRIMARY KEY,
    student_samplers VARCHAR(128)[],
    sampling_locality VARCHAR(128),
    notes VARCHAR(1024),
    project_name VARCHAR(50) REFERENCES Project(project_name),
    date DATE

);

CREATE TABLE Analysis (
    analysis_id SERIAL PRIMARY KEY,
    analysis_type VARCHAR(20) CHECK (analysis_type IN ('AxioImager', 'AxioScope', 'ZeissSEM', 'OxfordSEM')),
    sample_name VARCHAR(50) REFERENCES Sample(sample_name),
    project_name VARCHAR(50) REFERENCES Project(project_name),
    date  DATE
);

CREATE TABLE Map (
    map_name VARCHAR(50) PRIMARY KEY,
    map_description VARCHAR(1024),
    map_type VARCHAR(50),
    file_path VARCHAR(255),
    analysis_id INT REFERENCES Analysis(analysis_id),
    sample_name VARCHAR(50) REFERENCES Sample(sample_name),
    project_name VARCHAR(50) REFERENCES Project(project_name),
    date DATE
);
```
