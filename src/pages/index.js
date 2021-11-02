import React, { useState } from 'react';
import { Tabs, Tooltip, Select, Table } from 'antd';
import 'antd/dist/antd.css';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { useAllCollections } from '../hooks/useCollection';
import { columns } from '../static/indexTable';

const filterOption = { Language: '' };

const IndexPage = () => {
  const { collections, Languages } = useAllCollections();
  const [filterData, setFilterData] = useState(collections);
  const selectPageData = [
    { type: 'Language', name: '分榜', options: Languages },
  ];
  const handleFilter = (e, type) => {
    const value = e;
    filterOption[type] = value;
    const match = (key, value) =>
      ['', 'All', value].includes(filterOption[key]);
    const filteredData = collections.filter((data) =>
      match('Language', data.Language)
    );
    setFilterData(filteredData);
  };
  const { TabPane } = Tabs;
  const { Option } = Select;
  return (
    <Layout>
      <Seo title="GitHub-Chinese-Top-Charts" />
      <div className="flex flex-col items-start md:items-center md:flex-row">
        <div className="md:mr-4 h-28 w-28 text-7xl flex md:justify-center items-center justify-start">
          📜
        </div>
        <h1 className="text-2xl font-extrabold text-black md:text-5xl dark:text-white">
          GitHub-Chinese-Top-Charts
        </h1>
      </div>
      <div className="mt-6 flex gap-4 items-center">
        <a href="https://github.com/wz930206/GitHub-Chinese-Top-Charts">
          <img
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/wz930206/GitHub-Chinese-Top-Charts?style=social"
          />
        </a>
        <a href="https://github.com/wz930206/GitHub-Chinese-Top-Charts">
          <img
            src="https://visitor-badge.glitch.me/badge?page_id=GitHub-Chinese-Top-Charts"
            alt="visitor badge"
          />
        </a>
      </div>
      <div className="mt-6 text-gray-900 dark:text-white">
        <p className="border-l-4 border-gray-200 py-2 my-3 px-3 text-gray-500 dark:text-white">
          Author：kon9chunkit，
          <a
            className="text-blue-700 transition hover:text-blue-600 dark:text-blue-400  dark:hover:text-blue-300"
            href="https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts"
            target="_blank"
            rel="noreferrer"
          >
            <Tooltip title="🇨🇳 GitHub中文排行榜，帮助你发现高分优秀中文项目、更高效地吸收国人的优秀经验成果；榜单每周更新一次，敬请关注！">
              <span>GitHub-Chinese-Top-Charts</span>
            </Tooltip>
          </a>{' '}
        </p>
      </div>
      <div className="flex w-full mt-4 flex-col items-center gap-4 sm:flex-row">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="All Language" key="1">
            <div className="flex w-full mt-4 flex-col items-center gap-4 sm:flex-row">
              {selectPageData.map((item, index) => (
                <Select
                  showSearch
                  style={{ width: 220 }}
                  key={index}
                  onChange={(value) => {
                    handleFilter(value, item.type);
                  }}
                  defaultValue="placeholder"
                  required
                >
                  <Option value="placeholder" disabled="disabled">
                    {item.name}
                  </Option>
                  <Option value="All">全部</Option>
                  {item.options.map((option, key) => (
                    <Option key={key} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              ))}
            </div>
            <Table
              className="mt-6"
              columns={columns}
              dataSource={filterData}
              scroll={{ x: 1600, y: 500 }}
            />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default IndexPage;
