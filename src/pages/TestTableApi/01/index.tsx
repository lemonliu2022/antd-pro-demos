import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, Tag, Space } from 'antd';

type GithubIssueItem = {
  id: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
};

const data: GithubIssueItem[] = [
  {
    id: 624748504,
    title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
    labels: [
      {
        name: 'bug',
        color: 'error',
      },
      {
        name: 'foo',
        color: 'success',
      },
    ],
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '🐛 [BUG]无法创建工程npm create umi',
    labels: [
      {
        name: 'bug',
        color: 'error',
      },
    ],
    state: 'open',
    created_at: '2020-05-26T08:19:22Z',
  },
];

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record) => [
      <a key="editable">编辑</a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
