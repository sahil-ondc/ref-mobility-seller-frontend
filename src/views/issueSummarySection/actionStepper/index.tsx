import React, { useState } from 'react'
import { Steps } from 'antd'
import moment from 'moment'

interface IssueTrackingProps {
  singleIssueDetail: any
}

const ActionStepper: React.FC<IssueTrackingProps> = ({ singleIssueDetail }) => {
  const details = singleIssueDetail?.data?.issue?.issue_actions
  const [current, setCurrent] = useState(0)

  const onChange = (value: number) => {
    setCurrent(value)
  }
  const outputFormat = 'dddd DD/MM/YY [at] h:mma'

  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        direction="vertical"
        items={[
          {
            title: 'Open',
            description: (
              <div>
                <div>Updated At {moment(details?.complainant_actions[0]?.updated_at).format(outputFormat)}</div>
                <div>Updated By: {details?.complainant_actions[0]?.updated_by?.person?.name}</div>
              </div>
            ),
          },
          {
            title: 'Processing',
            description: (
              <div>
                <div>Updated At {moment(details?.respondent_actions[0]?.updated_at).format(outputFormat)}</div>
                <div>Updated By: {details?.respondent_actions[0]?.updated_by?.person?.name}</div>
              </div>
            ),
          },
          {
            title: 'Cascaded',
            description: (
              <div>
                <div>Updated At {moment(details?.complainant_actions[1]?.updated_at).format(outputFormat)}</div>
                <div>Updated By: {details?.respondent_actions[1]?.updated_by?.person?.name}</div>
              </div>
            ),
          },
          {
            title: 'Processing',
            description: '',
          },
        ]}
      />
    </>
  )
}

export default ActionStepper
