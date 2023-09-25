# **Beneski Electron Microscope Lab Database Project**
Developed by: **Ian Kamweru, Guilherme Santos, Abdul Rauf, & Arjun Kejriwal**
## **Background & Project Statement**
The Beneski Scanning Electron Microscope Lab  has about 2 TB of images and point data collected from rocks around the world taken on light microscopes and scanning electron microscopes that need to be wrangled. 

All of the data is stored on a TrueNAS Scale server and comes from four different sources (2 microscopes and 2 mineralogic software) hence the data needs to be consolidated. A database will help lab users quickly access all their sample data regardless of the source, confusion free.

Enhancing the user experience of lab users will support research across natural science fields at Amherst College, and the Five Colleges.

## **Proposed Solution**
Our proposed solution entails setting up a PostgreSQL database hosted within a Docker container to store metadata on all the rock samples for a particular project. This database would help consolidate all the maps for the different sample including images and point data from mineralogic analysis.

We will surface the database through a React based front-end to allow researchers to interact with the database.

We will also have an API layer in Node JS and Express JS connecting the front end and back end.

## **ER Model**
We have 4 entities:

- Project: An abstraction of the research project at hand. Under a project, a researcher can have multiple rock samples under study.
- Sample: A rock/mineral sample taken for the purpose of analysis. We can have multiple analysis types performed on a sample.
- Analysis: There are 4 types of analysis taken on a sample ie 

    AxioImager - full thin section images of the sample taken by the microscopes

    AxioScope - small region of interest (ROI) inset maps taken on the light microscope to highlight a smaller section for analysis

    OxfordSEM - Full thin section heat maps showing where there is a lot (bright) and a little (dark) of an element of interest. Point data in the form of csv files are also exported to represent mapping of all elements in the sample.

    ZeissSEM - Point data on the elemental composition of each element in the sample.

![ER Model](./res/ER-model.png)

## **Milestones**
- [x] **Meet with the customer**
- [x] **Preliminary ER Diagram**
- [ ] **Pitch idea to the customer and refine ER Model if necessary**
- [ ] **Set up linux environment**
- [ ] **Set up database using PostgreSQL**
- [ ] **Set up the database in a Docker container**
- [ ] **Set up the API layer in NodeJS and Express JS**
- [ ] **Set up the front end in React**
