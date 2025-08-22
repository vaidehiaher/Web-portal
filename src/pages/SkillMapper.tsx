import React from 'react'
import { Layout } from '@/components/Layout'
import { SkillGapMapper } from '@/components/student/SkillGapMapper'
import { skillGapData } from '@/data/mockData'

export function SkillMapper() {
  return (
    <Layout>
      <SkillGapMapper skillGaps={skillGapData} />
    </Layout>
  )
}