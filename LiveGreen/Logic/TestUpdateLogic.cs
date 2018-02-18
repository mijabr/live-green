using LiveGreen.Data;
using LiveGreen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace LiveGreen.Logic
{
    public class TestUpdateLogic
    {
        private IRepository<TestResult> testResultRepo;
        private IRepository<TestFeature> testFeatureRepo;

        public TestUpdateLogic(IRepository<TestResult> testResultRepo, IRepository<TestFeature> testFeatureRepo)
        {
            this.testResultRepo = testResultRepo;
            this.testFeatureRepo = testFeatureRepo;

            this.testResultRepo.UpdateDatabase();
        }

        public IEnumerable<TestResult> GetTestResults()
        {
            return testResultRepo.Get();
        }

        public IEnumerable<TestResult> GetTestResultsByFeature(string feature)
        {
            return testResultRepo.Get(Where.EQ("Feature", feature));
        }

        public IEnumerable<TestResult> GetTestResultsByBuildResultKey(string buildResultKey)
        {
            return testResultRepo.Get(Where.EQ("BuildResultKey", buildResultKey));
        }

        public IEnumerable<TestResult> GetTestResultsByTestId(string testId)
        {
            return testResultRepo.Get(Where.EQ("TestId", testId));
        }

        public IEnumerable<TestFeature> GetFeatures(string featureName = null)
        {
            return testFeatureRepo.Get(featureName == null ? null : Where.EQ("Name", featureName)).OrderByDescending(f => f.RunDate);
        }

        public void CleanFeature()
        {
            testFeatureRepo.Delete(Where.EQ("Name", null));
        }

        public void AddTestResults(IEnumerable<TestResult> testResults)
        {
            SetTestId(testResults);

            testResultRepo.Insert(testResults);

            var feature = new TestFeature()
            {
                Name = testResults.FirstOrDefault(t => !string.IsNullOrEmpty(t.Feature))?.Feature,
                TestCount = testResults.Count(),
                TestPassCount = testResults.Count(t => t.Success),
                BuildResultKey = testResults.FirstOrDefault(t => !string.IsNullOrEmpty(t.BuildResultKey))?.BuildResultKey,
                RunDate = DateTime.Now,
                Duration = testResults.Sum((t) => {
                    double.TryParse(t.Duration, out double duration);
                    return duration;
                }).ToString()
            };

            testFeatureRepo.Upsert(feature, Where.EQ("Name", feature.Name));
        }

        private void SetTestId(IEnumerable<TestResult> testResults)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                foreach (var testResult in testResults)
                {
                    testResult.TestId = ByteArrayToString(md5Hash.ComputeHash(Encoding.ASCII.GetBytes($"{testResult.Feature}{testResult.Name}")));
                }
            }
        }

        private string ByteArrayToString(byte[] ba)
        {
            string hex = BitConverter.ToString(ba);
            return hex.Replace("-", "");
        }
    }
}
