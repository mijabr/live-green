using LiveGreen.Logic;
using LiveGreen.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LiveGreen.Controllers
{
    [Produces("application/json")]
    [Route("api/TestResult")]
    public class TestResultController : Controller
    {
        private TestUpdateLogic logic;

        public TestResultController(TestUpdateLogic logic)
        {
            this.logic = logic;
        }

        [HttpGet]
        public IEnumerable<TestResult> Get()
        {
            return logic.GetTestResults();
        }

        [HttpGet("Feature/{feature}", Name = "GetByFeature")]
        public IEnumerable<TestResult> GetByFeature(string feature)
        {
            return logic.GetTestResultsByFeature(feature);
        }

        [HttpGet("TestRun/{buildResultKey}", Name = "GetByBuildResultKey")]
        public IEnumerable<TestResult> GetByBuildResultKey(string buildResultKey)
        {
            return logic.GetTestResultsByBuildResultKey(buildResultKey);
        }

        [HttpGet("TestHistory/{testid}", Name = "GetTestHistory")]
        public IEnumerable<TestResult> GetTestHistory(string testid)
        {
            return logic.GetTestResultsByTestId(testid);
        }

        [HttpGet("Summary", Name = "GetFeature")]
        public IEnumerable<TestFeature> GetFeature()
        {
            return logic.GetFeatures();
        }

        [HttpGet("Summary/Clean", Name = "CleanFeature")]
        public void CleanFeature()
        {
            logic.CleanFeature();
        }

        [HttpPost]
        public void Post([FromBody]IEnumerable<TestResult> results)
        {
            logic.AddTestResults(results);
        }
    }
}
