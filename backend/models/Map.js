class Map {
  constructor(map_name, map_description, map_type, file_path, date_created, analysis_id, sample_name, project_name) {
    this.map_name = map_name;
    this.map_description = map_description;
    this.map_type = map_type;
    this.file_path = file_path;
    this.date_created = date_created;
    this.analysis_id = analysis_id;
    this.sample_name = sample_name;
    this.project_name = project_name;
  }
}

module.exports = Map;
