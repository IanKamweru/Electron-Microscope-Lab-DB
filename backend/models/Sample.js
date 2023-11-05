class Sample {
  constructor(sample_name, student_samplers, sampling_locality, year_sampled, notes, project_name) {
    this.sample_name = sample_name;
    this.student_samplers = student_samplers;
    this.sampling_locality = sampling_locality;
    this.year_sampled = year_sampled;
    this.notes = notes;
    this.project_name = project_name;
  }
}

module.exports = Sample;
