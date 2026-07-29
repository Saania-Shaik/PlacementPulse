export const calculateKPIs = (data) => {
  const total = data.length;
  if (total === 0) return { total: 0, placed: 0, notPlaced: 0, avgSalary: 0, highestSalary: 0, placementRate: 0 };

  let placedCount = 0;
  let totalSalary = 0;
  let highestSalary = 0;

  for (let i = 0; i < total; i++) {
    const student = data[i];
    if (student.Placement_Status === 'Placed') {
      placedCount++;
      const salary = parseFloat(student.Salary_Package);
      totalSalary += salary;
      if (salary > highestSalary) highestSalary = salary;
    }
  }

  return {
    total,
    placed: placedCount,
    notPlaced: total - placedCount,
    avgSalary: placedCount > 0 ? (totalSalary / placedCount).toFixed(2) : 0,
    highestSalary: highestSalary.toFixed(2),
    placementRate: ((placedCount / total) * 100).toFixed(1),
  };
};

export const aggregateByBranch = (data) => {
  const branchMap = {};
  for (let i = 0; i < data.length; i++) {
    const { Branch, Placement_Status, Salary_Package, CGPA, Coding_Score } = data[i];
    if (!branchMap[Branch]) {
      branchMap[Branch] = { total: 0, placed: 0, totalSalary: 0, totalCGPA: 0, totalCoding: 0 };
    }
    branchMap[Branch].total++;
    branchMap[Branch].totalCGPA += parseFloat(CGPA);
    branchMap[Branch].totalCoding += parseInt(Coding_Score);
    
    if (Placement_Status === 'Placed') {
      branchMap[Branch].placed++;
      branchMap[Branch].totalSalary += parseFloat(Salary_Package);
    }
  }

  return Object.keys(branchMap).map(branch => {
    const stats = branchMap[branch];
    return {
      branch,
      placed: stats.placed,
      total: stats.total,
      placementRate: parseFloat(((stats.placed / stats.total) * 100).toFixed(1)),
      avgSalary: stats.placed > 0 ? parseFloat((stats.totalSalary / stats.placed).toFixed(2)) : 0,
      avgCGPA: parseFloat((stats.totalCGPA / stats.total).toFixed(2)),
      avgCoding: parseInt((stats.totalCoding / stats.total).toFixed(0)),
    };
  });
};

export const aggregateSkills = (data) => {
  let placedCoding = 0, placedAptitude = 0, placedComm = 0, placedLogic = 0;
  let notPlacedCoding = 0, notPlacedAptitude = 0, notPlacedComm = 0, notPlacedLogic = 0;
  let placedCount = 0, notPlacedCount = 0;

  for (let i = 0; i < data.length; i++) {
    const s = data[i];
    if (s.Placement_Status === 'Placed') {
      placedCount++;
      placedCoding += parseInt(s.Coding_Score);
      placedAptitude += parseInt(s.Aptitude_Score);
      placedComm += parseInt(s.Communication_Score);
      placedLogic += parseInt(s.Logical_Reasoning_Score);
    } else {
      notPlacedCount++;
      notPlacedCoding += parseInt(s.Coding_Score);
      notPlacedAptitude += parseInt(s.Aptitude_Score);
      notPlacedComm += parseInt(s.Communication_Score);
      notPlacedLogic += parseInt(s.Logical_Reasoning_Score);
    }
  }

  const p = placedCount || 1;
  const np = notPlacedCount || 1;

  return [
    { skill: 'Coding', Placed: Math.round(placedCoding / p), 'Not Placed': Math.round(notPlacedCoding / np) },
    { skill: 'Aptitude', Placed: Math.round(placedAptitude / p), 'Not Placed': Math.round(notPlacedAptitude / np) },
    { skill: 'Communication', Placed: Math.round(placedComm / p), 'Not Placed': Math.round(notPlacedComm / np) },
    { skill: 'Logical', Placed: Math.round(placedLogic / p), 'Not Placed': Math.round(notPlacedLogic / np) },
  ];
};

export const aggregateExperience = (data) => {
  let placedInternships = 0, placedProjects = 0, placedCerts = 0, placedHacks = 0;
  let notPlacedInternships = 0, notPlacedProjects = 0, notPlacedCerts = 0, notPlacedHacks = 0;
  let placedCount = 0, notPlacedCount = 0;

  for (let i = 0; i < data.length; i++) {
    const s = data[i];
    if (s.Placement_Status === 'Placed') {
      placedCount++;
      placedInternships += parseInt(s.Internships);
      placedProjects += parseInt(s.Projects);
      placedCerts += parseInt(s.Certifications);
      placedHacks += parseInt(s.Hackathons);
    } else {
      notPlacedCount++;
      notPlacedInternships += parseInt(s.Internships);
      notPlacedProjects += parseInt(s.Projects);
      notPlacedCerts += parseInt(s.Certifications);
      notPlacedHacks += parseInt(s.Hackathons);
    }
  }

  const p = placedCount || 1;
  const np = notPlacedCount || 1;

  return [
    { type: 'Internships', Placed: (placedInternships / p).toFixed(1), 'Not Placed': (notPlacedInternships / np).toFixed(1) },
    { type: 'Projects', Placed: (placedProjects / p).toFixed(1), 'Not Placed': (notPlacedProjects / np).toFixed(1) },
    { type: 'Certifications', Placed: (placedCerts / p).toFixed(1), 'Not Placed': (notPlacedCerts / np).toFixed(1) },
    { type: 'Hackathons', Placed: (placedHacks / p).toFixed(1), 'Not Placed': (notPlacedHacks / np).toFixed(1) },
  ];
};
